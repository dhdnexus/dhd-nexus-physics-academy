from pathlib import Path

def create_folder(path: Path):

    path.mkdir(parents=True, exist_ok=True)

    print(f"✓ {path}")


def create_file(path: Path, content=""):

    path.write_text(content, encoding="utf-8")

    print(f"✓ {path.name}")