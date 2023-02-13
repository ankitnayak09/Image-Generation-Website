import { surpriseMePrompts } from "../Constants";
import FileSaver from "file-saver";

export function getRandomPrompt(prompt) {
	const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length);
	const randomPrompt = surpriseMePrompts[randomIndex];

	if (randomPrompt === prompt) return getRandomPrompt(prompt);

	return randomPrompt;
}

export async function downloadImage(_id, photo) {
	// FileSaver.saveAs(photo, `download-${_id}.jpg`);
	const image = await fetch(photo);
	const imageBlog = await image.blob();
	const imageURL = URL.createObjectURL(imageBlog);

	const link = document.createElement("a");
	link.href = imageURL;
	link.download = `download-${_id._id}.jpg`;
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
}
