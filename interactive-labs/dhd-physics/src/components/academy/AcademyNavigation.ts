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
                status: "coming-soon",
              },
              {
                id: "acceleration",
                title: "Acceleration",
                status: "coming-soon",
              },
              {
                id: "motion-graphs",
                title: "Motion Graphs",
                status: "coming-soon",
              },
              {
                id: "suvat",
                title: "SUVAT",
                status: "coming-soon",
              },
              {
                id: "projectile-motion",
                title: "Projectile Motion",
                status: "coming-soon",
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
                status: "coming-soon",
              },
              {
                id: "newtons-second-law",
                title: "Newton's Second Law",
                status: "coming-soon",
              },
              {
                id: "newtons-third-law",
                title: "Newton's Third Law",
                status: "coming-soon",
              },
              {
                id: "friction",
                title: "Friction",
                status: "coming-soon",
              },
              {
                id: "circular-motion",
                title: "Circular Motion",
                status: "coming-soon",
              },
              {
                id: "momentum-impulse",
                title: "Momentum & Impulse",
                status: "coming-soon",
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
