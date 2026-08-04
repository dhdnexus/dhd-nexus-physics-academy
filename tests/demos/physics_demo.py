from sdk.physics.mechanics.kinematics import Kinematics


print("=" * 40)
print("DHD Nexus Physics Engine Demo")
print("=" * 40)

d = Kinematics.displacement(25)

v = Kinematics.velocity(12)

a = Kinematics.acceleration(2.5)

print()

print(d["displacement"])

print(v["velocity"])

print(a["acceleration"])