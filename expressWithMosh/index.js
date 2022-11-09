const Joi = require("joi");
const express = require("express");
const app = express();

app.use(express.json());

const courses = [
  {
    id: 1,
    name: "Course 1",
  },
  {
    id: 2,
    name: "Course 2",
  },
  {
    id: 3,
    name: "Course 3",
  },
  {
    id: 4,
    name: "Course 4",
  },
];

app.get("/", (req, res) => {
  res.send("Hello World!!");
});

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

app.get("/api/courses/:id", (req, res) => {
  const course = getCourse(req.params.id);
  if (!course) res.status(404).send("Could not find course with that id ");
  res.send(course);
});

app.post("/api/courses", (req, res) => {
  const { error } = validateCourse(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };

  courses.push(course);
  res.send(course);
});

app.put("/api/courses/:id", (req, res) => {
  const course = getCourse(req.params.id);
  if (!course) {
    res.status(404).send("Could not find that course");
    return;
  }

  const { error } = validateCourse(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  course.name = req.body.name;
  res.send(course);
});

app.delete("/api/courses/:id", (req, res) => {
  const course = getCourse(req.params.id);
  if (!course) {
    res.status(404).send("Could not find that course");
    return;
  }
  const index = courses.indexOf(course);
  courses.splice(index, 1);
  res.send(course);
});

const getCourse = (id) => {
  return courses.find((c) => c.id === parseInt(id));
};

const validateCourse = (course) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  return schema.validate(course);
};

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
