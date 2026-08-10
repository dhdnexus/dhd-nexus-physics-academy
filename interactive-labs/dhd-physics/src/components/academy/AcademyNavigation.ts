export type LessonStatus = "current" | "coming-soon";

export type AcademyLesson = {
  id: string;
  title: string;
  status: LessonStatus;
  href?: string;
};

export type AcademySubmodule = {
  title: string;
  expanded: boolean;
  lessons: AcademyLesson[];
};

export type AcademyModule = {
  title: string;
  expanded: boolean;
  submodules?: AcademySubmodule[];
  lessons?: AcademyLesson[];
};

export type AcademyNavigation = {
  title: string;
  modules: AcademyModule[];
};

export const academyNavigation: AcademyNavigation[] = [
  {
    title: "Physics Academy",

    modules: [
      {
        title: "Mechanics",
        expanded: true,

        submodules: [
          {
            title: "Kinematics",
            expanded: true,

            lessons: [
              {
                id: "displacement",
                title: "Displacement",
                status: "current",
                href: "/mechanics/kinematics/displacement",
              },
              {
                id: "velocity",
                title: "Velocity",
                status: "current",
                href: "/mechanics/kinematics/velocity",
              },
              {
                id: "acceleration",
                title: "Acceleration",
                status: "current",
                href: "/mechanics/kinematics/acceleration",
              },
              {
                id: "motion-graphs",
                title: "Motion Graphs",
                status: "current",
                href: "/mechanics/kinematics/motion-graphs",
              },
              {
                id: "suvat",
                title: "SUVAT",
                status: "current",
                href: "/mechanics/kinematics/suvat",
              },
              {
                id: "projectile-motion",
                title: "Projectile Motion",
                status: "current",
                href: "/mechanics/kinematics/projectile-motion",
              },
            ],
          },

          {
            title: "Dynamics",
            expanded: true,

            lessons: [
              {
                id: "newtons-first-law",
                title: "Newton's First Law",
                status: "current",
                href: "/mechanics/dynamics/newtons-first-law",
              },
              {
                id: "newtons-second-law",
                title: "Newton's Second Law",
                status: "current",
                href: "/mechanics/dynamics/newtons-second-law",
              },
              {
                id: "newtons-third-law",
                title: "Newton's Third Law",
                status: "current",
                href: "/mechanics/dynamics/newtons-third-law",
              },
              {
                id: "friction",
                title: "Friction",
                status: "current",
                href: "/mechanics/dynamics/friction",
              },
              {
                id: "circular-motion",
                title: "Circular Motion",
                status: "current",
                href: "/mechanics/dynamics/circular-motion",
              },
              {
                id: "momentum-impulse",
                title: "Momentum & Impulse",
                status: "current",
                href: "/mechanics/dynamics/momentum-impulse",
              },
            ],
          },
        ],
      },

      {
        title: "Work, Energy & Power",
        expanded: false,
      },

      {
        title: "Gravitation",
        expanded: false,
      },

      {
        title: "Oscillations",
        expanded: false,
      },

      {
        title: "Waves & Optics",
        expanded: false,
      },

      {
        title: "Electricity & Magnetism",
        expanded: false,
      },

      {
        title: "Thermal Physics",
        expanded: false,
      },

      {
        title: "Modern Physics",
        expanded: false,
      },

      {
        title: "Interactive Laboratories",
        expanded: false,
      },

      {
        title: "Simulations",
        expanded: false,
      },

      {
        title: "Python Playground",
        expanded: false,
      },

      {
        title: "Examination Solutions",
        expanded: false,
      },
    ],
  },
];
