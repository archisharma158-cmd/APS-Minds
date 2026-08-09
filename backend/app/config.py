from pydantic_settings import BaseSettings
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

DEFAULT_RSS_FEEDS = ",".join([
    "https://feeds.feedburner.com/TheHackersNews",
    "https://techcrunch.com/category/artificial-intelligence/feed/",
    "https://www.technologyreview.com/feed/",
    "https://blog.google/technology/ai/rss/",
    "https://openai.com/blog/rss.xml",
])


class Settings(BaseSettings):
    # Auth
    SECRET_KEY: str = "dev-secret-key-change-me"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 1440
    DATABASE_URL: str = f"sqlite:///{BASE_DIR / 'aps_minds.db'}"

    # ARCTES — Scout sources
    TAVILY_API_KEY: str = ""
    GITHUB_TOKEN: str = ""
    RSS_FEEDS: str = DEFAULT_RSS_FEEDS
    SCOUT_MAX_RESULTS: int = 10

    # ARCTES — Editor thresholds
    EDITOR_MIN_SCORE: float = 0.6

    # ARCTES — OpenRouter / Chat
    OPENROUTER_API_KEY: str = ""
    OPENROUTER_BASE_URL: str = "https://openrouter.ai/api/v1"
    ARCTES_MODEL: str = "openai/gpt-5-nano"

    model_config = {"env_file": str(BASE_DIR / ".env"), "extra": "ignore"}

    @property
    def rss_feed_urls(self) -> list[str]:
        return [u.strip() for u in self.RSS_FEEDS.split(",") if u.strip()]


settings = Settings()
