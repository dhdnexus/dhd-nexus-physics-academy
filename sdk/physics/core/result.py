from dataclasses import dataclass, field


@dataclass
class PhysicsResult:

    values: dict = field(default_factory=dict)

    equation: str = ""

    topic: str = ""

    explanation: str = ""

    def add(self, key, quantity):

        self.values[key] = quantity

    def __getitem__(self, key):

        return self.values[key]