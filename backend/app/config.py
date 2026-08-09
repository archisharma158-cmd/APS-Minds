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
    # SECRET_KEY / DATABASE_URL come from backend/.env (never hardcode secrets).
    SECRET_KEY: str = "dev-secret-key-change-me"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 1440
    # DATABASE_URL is read from the environment (e.g. Supabase PostgreSQL URI).
    # There is intentionally no SQLite default here.
    DATABASE_URL: str = ""

    # CORS — comma-separated list of allowed origins.
    CORS_ORIGINS: str = "http://localhost:5173,http://127.0.0.1:5173"

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
