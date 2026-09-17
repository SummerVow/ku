"""Create a source-only ZIP; dependencies, caches, generated output and credentials are excluded."""
from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED

root = Path(__file__).resolve().parents[1]
destination = root / 'artifacts' / 'li-jiafu-portfolio-source.zip'
destination.parent.mkdir(exist_ok=True)
exclude_dirs = {'node_modules', '.git', '.next', '.vinext', '.wrangler', '.sites-runtime',
                '.agents', '.codex', 'tmp', 'dist', 'artifacts', 'outputs', 'work', 'examples', 'tests', '__pycache__'}
exclude_files = {'package-lock.json', 'tsconfig.tsbuildinfo'}
count = 0
with ZipFile(destination, 'w', ZIP_DEFLATED, strict_timestamps=False) as archive:
    for directory, dirs, filenames in __import__('os').walk(root):
        dirs[:] = [d for d in dirs if d not in exclude_dirs]
        for filename in filenames:
            if filename in exclude_files or filename.startswith('.env') or filename.endswith(('.log','.pem')):
                continue
            path = Path(directory) / filename
            archive.write(path, 'li-jiafu-portfolio/' + path.relative_to(root).as_posix())
            count += 1
with ZipFile(destination) as archive:
    assert archive.testzip() is None
    for name in ['package.json','pnpm-lock.yaml','README.md','data/portfolio.ts','app/page.tsx','public/resume.pdf']:
        assert 'li-jiafu-portfolio/' + name in archive.namelist()
print(f'{count} source files, {destination.stat().st_size} bytes. ZIP verified.')
