# GSD XML Plan Schema

This schema defines the structure for `task_plan.xml` files used in the GSD planning phase.

```xml
<plan>
  <phase name="Phase Name">
    <task id="1">
      <description>Description of the task</description>
      <files>
        <file>path/to/file1.py</file>
        <file>path/to/file2.py</file>
      </files>
      <action>
        Detailed description of the modification or creation required.
      </action>
      <verify>
        Command to verify the change (e.g., mise run test)
      </verify>
    </task>
  </phase>
</plan>
```
