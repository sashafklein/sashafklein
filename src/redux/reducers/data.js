import work from "../data/work";
import education from "../data/education";
import skills from "../data/skills";
import projects from "../data/projects";
import posts from "../data/posts";

export const initialState = { work, education, skills, projects, posts };

export const data = (state = initialState) => state;

export default data;
