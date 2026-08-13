from sdk.physics.mechanics.kinematics import Kinematics


print("=" * 40)
print("DHD Nexus Physics Engine Demo")
print("=" * 40)

# Displacement is demonstrated separately in displacement_demo.py --
# Kinematics no longer duplicates that calculation.

v = Kinematics.velocity(12)

a = Kinematics.acceleration(2.5)

print()

print(v["velocity"])

print(a["acceleration"])