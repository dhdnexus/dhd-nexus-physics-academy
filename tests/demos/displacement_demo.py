from sdk.physics.mechanics.displacement import Displacement


result = Displacement.calculate(
    initial_position=5,
    final_position=18
)

print("=" * 40)
print("DHD Nexus Physics Engine")
print("=" * 40)

print()

print(result["initial_position"])
print(result["final_position"])
print(result["displacement"])