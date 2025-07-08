from PIL import Image, ImageDraw
import tempfile


def generateFAQ(markdown: str) -> str:
    """Convert markdown text to PNG and return file URL."""
    img = Image.new('RGB', (400, 200), color=(255, 255, 255))
    draw = ImageDraw.Draw(img)
    draw.text((10, 10), markdown, fill=(0, 0, 0))
    tmp = tempfile.NamedTemporaryFile(delete=False, suffix='.png', dir='/tmp')
    img.save(tmp.name)
    return f'file://{tmp.name}'
