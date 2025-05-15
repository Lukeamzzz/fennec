import { Meta, StoryObj } from "@storybook/react"
import BasicLink from "./BasicLink"

// Component's metadata
const meta: Meta<typeof BasicLink> = {
    title: "Components/BasicLink",
    component: BasicLink,
    tags: ["autodocs"]
}
export default meta;

// Basic story
export const Basic: StoryObj<typeof BasicLink> = {
    args: { text: "Planes", href: "/planes"  }
}

// Alternative story
export const Alternative: StoryObj<typeof BasicLink> = {
    args: { text: "Ver más →", href: "/planes"  }
}