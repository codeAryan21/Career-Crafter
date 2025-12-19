import pdf from 'pdf-parse';
import fs from 'fs';

export const parseResume = async (filePath) => {
    try {
        const dataBuffer = fs.readFileSync(filePath);
        const data = await pdf(dataBuffer);
        const text = data.text;

        // Extract skills using keywords
        const skillKeywords = ['javascript', 'python', 'java', 'react', 'node', 'mongodb', 'sql', 'html', 'css', 'git', 'aws', 'docker'];
        const skills = skillKeywords.filter(skill => 
            text.toLowerCase().includes(skill.toLowerCase())
        );

        // Extract experience (simplified)
        const experienceMatch = text.match(/experience|work|employment/i);
        const experience = experienceMatch ? 
            text.substring(experienceMatch.index, experienceMatch.index + 500) : '';

        // Extract education
        const educationMatch = text.match(/education|degree|university|college/i);
        const education = educationMatch ? 
            text.substring(educationMatch.index, educationMatch.index + 300) : '';

        // Extract summary (first paragraph)
        const summary = text.split('\n').slice(0, 3).join(' ').substring(0, 200);

        return {
            skills,
            experience,
            education,
            summary
        };
    } catch (error) {
        console.error('Error parsing resume:', error);
        throw new Error('Failed to parse resume');
    }
};