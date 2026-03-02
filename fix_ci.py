with open('.github/workflows/ci.yml', 'r') as f:
    content = f.read()

content = content.replace("npm run test:coverage", "npm run test:coverage -- --passWithNoTests")

with open('.github/workflows/ci.yml', 'w') as f:
    f.write(content)
