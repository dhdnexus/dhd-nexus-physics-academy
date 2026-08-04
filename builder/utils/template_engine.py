from pathlib import Path


class TemplateEngine:

    def __init__(self, template_directory):

        self.template_directory = Path(template_directory)

    def render(self, template_name, context):

        template = (
            self.template_directory / template_name
        ).read_text(encoding="utf-8")

        for key, value in context.items():

            template = template.replace(
                "{{" + key + "}}",
                str(value)
            )

        return template