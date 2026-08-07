from apscheduler.schedulers.background import BackgroundScheduler

scheduler = BackgroundScheduler()


def init_scheduler():
    """Initialize APScheduler. Add jobs here when ARCTES agents are implemented."""
    scheduler.start()


def shutdown_scheduler():
    scheduler.shutdown(wait=False)
