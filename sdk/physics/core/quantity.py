from dataclasses import dataclass


@dataclass
class Quantity:
    value: float
    unit: str
    symbol: str
    name: str

    def __str__(self):
        return f"{self.symbol} = {self.value} {self.unit}"