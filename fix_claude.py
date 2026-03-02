with open('.github/workflows/claude.yml', 'r') as f:
    content = f.read()

content = content.replace("      id-token: write\n", "")
content = content.replace("anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}", "anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}\n          github_token: ${{ secrets.GITHUB_TOKEN }}")

with open('.github/workflows/claude.yml', 'w') as f:
    f.write(content)
