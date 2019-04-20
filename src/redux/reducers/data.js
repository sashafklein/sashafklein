import work from "../data/work";
import education from "../data/education";
import skills from "../data/skills";
import portfolioItems from "../data/portfolioItems";
import posts from "../data/posts";

export const initialState = { work, education, skills, portfolioItems, posts };

export const data = (state = initialState) => state;

export default data;
