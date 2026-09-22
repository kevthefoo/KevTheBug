import meetJohnnyImage from "@/asset/materials/showcase/meetjohnny.png";
import awsPlayboardImage from "@/asset/materials/showcase/awsplayboard.png";
import itJobRadarImage from "@/asset/materials/showcase/itjobradar.png";
import wackyWizardImage from "@/asset/materials/showcase/wackywizarduni.png";
import ferrolinkImage from "@/asset/materials/showcase/ferrolink.png";
import cutThatCrapImage from "@/asset/materials/showcase/cuthatcrap.png";
import vocablakeImage from "@/asset/materials/showcase/vocablake.png";
import yamataImage from "@/asset/materials/showcase/yamata.png";
import { publicProjects } from "./public-projects.mjs";

const projectImages = [
  meetJohnnyImage,
  awsPlayboardImage,
  itJobRadarImage,
  wackyWizardImage,
  ferrolinkImage,
  cutThatCrapImage,
  vocablakeImage,
  yamataImage,
];

export const projects = publicProjects.map((project, index) => ({
  ...project,
  image: projectImages[index],
}));
