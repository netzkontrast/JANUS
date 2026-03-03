import sys

def main():
    try:
        with open('STATE.md', 'r') as f:
            content = f.read()

        # Update Current Task and Latest Update
        content = content.replace('**Current Task:** Architecture design drafted for Dual AI Agent System.', '**Current Task:** Fix Next.js setup and package.json syntax errors.')

        from datetime import datetime
        today = datetime.now().strftime('%Y-%m-%d')

        import re
        content = re.sub(r'\*\*Latest Update:\*\* .*', f'**Latest Update:** {today}', content)

        # Add new completed action
        completed_actions_idx = content.find('**Completed Actions:**')
        if completed_actions_idx != -1:
            next_line_idx = content.find('\n', completed_actions_idx) + 1
            new_action = "- [x] **Setup:** Fixed Next.js configuration, ESLint ignores, and package.json syntax/test scripts.\n"
            content = content[:next_line_idx] + "\n" + new_action + content[next_line_idx:]

        with open('STATE.md', 'w') as f:
            f.write(content)

        print("Successfully updated STATE.md")
    except Exception as e:
        print(f"Error updating STATE.md: {e}")

if __name__ == '__main__':
    main()
