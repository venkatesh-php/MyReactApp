import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("students", "routes/students/students.tsx"),
  route("students/add", "routes/students/student-form.tsx"),
  route("students/edit/:id", "routes/students/student-edit.tsx"),
  route("deleteStudent/:id", "routes/students/student-delete.tsx"),
  route("teachers", "routes/teachers.tsx"),
  route("principal", "routes/principal.tsx"),
] satisfies RouteConfig;
