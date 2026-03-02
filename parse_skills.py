import os
import yaml
import json

skills_dir = 'skills'
skills_to_process = ['create-skill', 'janus-orchestrator', 'reflection-logic', 'scientific-critical-thinking']

for skill in skills_to_process:
    skill_md_path = os.path.join(skills_dir, skill, 'SKILL.md')
    plugin_json_path = os.path.join(skills_dir, skill, 'plugin.json')

    if os.path.exists(skill_md_path):
        with open(skill_md_path, 'r', encoding='utf-8') as f:
            content = f.read()

        if content.startswith('---'):
            end_idx = content.find('---', 3)
            if end_idx != -1:
                frontmatter_str = content[3:end_idx]
                try:
                    data = yaml.safe_load(frontmatter_str)

                    plugin_data = {
                        "name": data.get('name', skill),
                        "description": data.get('description', ''),
                        "version": data.get('metadata', {}).get('version', '1.0'),
                        "author": data.get('metadata', {}).get('author', 'K-Dense Inc.' if 'skill-author' in data.get('metadata', {}) else 'Jules (System 2)')
                    }

                    with open(plugin_json_path, 'w', encoding='utf-8') as pf:
                        json.dump(plugin_data, pf, indent=2)

                    print(f"Created {plugin_json_path}")
                except Exception as e:
                    print(f"Error parsing {skill_md_path}: {e}")
            else:
                print(f"No end frontmatter found in {skill_md_path}")
        elif content.startswith('name:'):
             try:
                 data = yaml.safe_load(content.split('---')[0] if '---' in content else content.split('#')[0])
                 plugin_data = {
                     "name": data.get('name', skill),
                     "description": data.get('description', ''),
                     "version": "1.0",
                     "author": "Jules (System 2)"
                 }
                 with open(plugin_json_path, 'w', encoding='utf-8') as pf:
                     json.dump(plugin_data, pf, indent=2)
                 print(f"Created {plugin_json_path}")
             except Exception as e:
                  print(f"Error parsing {skill_md_path}: {e}")
        else:
            print(f"No frontmatter found in {skill_md_path}")
    else:
        print(f"File not found: {skill_md_path}")
