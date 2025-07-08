from fastapi import APIRouter

router = APIRouter()


@router.post('/events/faq_update')
async def faq_update():
    """Handle FAQ update event."""
    return {'status': 'received'}
