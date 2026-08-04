"""
DHD Nexus

Lesson 01

Displacement Calculator
"""

from sdk.physics.mechanics.displacement import Displacement


print("=" * 50)
print("DHD NEXUS")
print("DISPLACEMENT CALCULATOR")
print("=" * 50)

print()

x1 = float(input("Initial Position (m): "))

x2 = float(input("Final Position (m): "))

result = Displacement.calculate(x1, x2)

print()

print(result["displacement"])