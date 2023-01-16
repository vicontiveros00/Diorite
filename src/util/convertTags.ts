import { Tag } from "./types";

//assign label and tag id to each tag so CreateReactSelect/ReactSelect can recognize each tag, peep CreatableReactSelect/ReactSelect documantation
const convertTags = (tags: Tag[]) => {
    return tags.map((tag) => {
        return {
            label: tag.label,
            value: tag.id
        }
    })
}

export default convertTags;