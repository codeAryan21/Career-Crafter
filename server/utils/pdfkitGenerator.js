import PDFDocument from 'pdfkit';

export const generateResumePDFKit = (resumeData) => {
    return new Promise((resolve, reject) => {
        try {
            const doc = new PDFDocument({ margin: 50 });
            const buffers = [];
            
            doc.on('data', buffers.push.bind(buffers));
            doc.on('end', () => {
                const pdfData = Buffer.concat(buffers);
                resolve(pdfData);
            });

            const pageWidth = doc.page.width - 100;
            let yPosition = 50;

            // Header Section
            doc.fontSize(28).fillColor('#2563eb').text(resumeData.personalInfo?.fullName || 'Your Name', 50, yPosition, { align: 'center' });
            yPosition += 40;
            
            // Contact Info
            const contactInfo = [];
            if (resumeData.personalInfo?.email) contactInfo.push(resumeData.personalInfo.email);
            if (resumeData.personalInfo?.phone) contactInfo.push(resumeData.personalInfo.phone);
            if (resumeData.personalInfo?.address) contactInfo.push(resumeData.personalInfo.address);
            
            if (contactInfo.length) {
                doc.fontSize(11).fillColor('#374151').text(contactInfo.join(' | '), 50, yPosition, { align: 'center' });
                yPosition += 20;
            }
            
            // Social Links
            const socialLinks = [];
            if (resumeData.personalInfo?.linkedin) socialLinks.push(`LinkedIn: ${resumeData.personalInfo.linkedin}`);
            if (resumeData.personalInfo?.github) socialLinks.push(`GitHub: ${resumeData.personalInfo.github}`);
            
            if (socialLinks.length) {
                doc.fontSize(10).fillColor('#6b7280').text(socialLinks.join(' | '), 50, yPosition, { align: 'center' });
                yPosition += 30;
            }
            
            // Horizontal line
            doc.strokeColor('#e5e7eb').lineWidth(1).moveTo(50, yPosition).lineTo(pageWidth + 50, yPosition).stroke();
            yPosition += 25;

            const addSectionHeader = (title) => {
                doc.fontSize(14).fillColor('#1f2937').text(title.toUpperCase(), 50, yPosition);
                yPosition += 25;
            };

            // Summary
            if (resumeData.summary) {
                addSectionHeader('Professional Summary');
                doc.fontSize(11).fillColor('#374151').text(resumeData.summary, 50, yPosition, { width: pageWidth, align: 'justify' });
                yPosition += doc.heightOfString(resumeData.summary, { width: pageWidth }) + 25;
            }

            // Skills
            if (resumeData.skills?.length) {
                addSectionHeader('Skills');
                doc.fontSize(11).fillColor('#374151').text(resumeData.skills.join(' • '), 50, yPosition, { width: pageWidth });
                yPosition += doc.heightOfString(resumeData.skills.join(' • '), { width: pageWidth }) + 25;
            }

            // Experience
            if (resumeData.experience?.length) {
                addSectionHeader('Professional Experience');
                
                resumeData.experience.forEach((exp, index) => {
                    // Job title and company
                    doc.fontSize(12).fillColor('#1f2937').text(`${exp.position}`, 50, yPosition);
                    doc.fontSize(11).fillColor('#2563eb').text(`${exp.company}`, 300, yPosition);
                    yPosition += 18;
                    
                    // Description
                    if (exp.description) {
                        doc.fontSize(10).fillColor('#4b5563').text(exp.description, 50, yPosition, { width: pageWidth });
                        yPosition += doc.heightOfString(exp.description, { width: pageWidth }) + 15;
                    }
                    
                    if (index < resumeData.experience.length - 1) yPosition += 10;
                });
                yPosition += 20;
            }

            // Education
            if (resumeData.education?.length) {
                addSectionHeader('Education');
                
                resumeData.education.forEach((edu, index) => {
                    doc.fontSize(12).fillColor('#1f2937').text(`${edu.degree} in ${edu.field}`, 50, yPosition);
                    yPosition += 15;
                    doc.fontSize(10).fillColor('#4b5563').text(`${edu.institution}${edu.gpa ? ' | GPA: ' + edu.gpa : ''}`, 50, yPosition);
                    yPosition += index < resumeData.education.length - 1 ? 20 : 25;
                });
            }

            // Projects
            if (resumeData.projects?.length) {
                addSectionHeader('Projects');
                
                resumeData.projects.forEach((project, index) => {
                    doc.fontSize(12).fillColor('#1f2937').text(project.name, 50, yPosition);
                    yPosition += 15;
                    
                    if (project.url) {
                        doc.fontSize(9).fillColor('#2563eb').text(`URL: ${project.url}`, 50, yPosition);
                        yPosition += 12;
                    }
                    
                    if (project.description) {
                        doc.fontSize(10).fillColor('#4b5563').text(project.description, 50, yPosition, { width: pageWidth });
                        yPosition += doc.heightOfString(project.description, { width: pageWidth }) + 8;
                    }
                    
                    if (project.technologies?.length) {
                        doc.fontSize(9).fillColor('#6b7280').text(`Technologies: ${project.technologies.join(', ')}`, 50, yPosition);
                        yPosition += 15;
                    }
                    
                    if (index < resumeData.projects.length - 1) yPosition += 10;
                });
                yPosition += 20;
            }

            // Certifications
            if (resumeData.certifications?.length) {
                addSectionHeader('Certifications');
                
                resumeData.certifications.forEach((cert, index) => {
                    doc.fontSize(11).fillColor('#1f2937').text(`${cert.name}`, 50, yPosition);
                    doc.fontSize(10).fillColor('#2563eb').text(`${cert.issuer}`, 300, yPosition);
                    yPosition += 15;
                    
                    const certDetails = [];
                    if (cert.date) {
                        certDetails.push(`Obtained: ${new Date(cert.date).toLocaleDateString()}`);
                    }
                    if (cert.url) {
                        certDetails.push(`URL: ${cert.url}`);
                    }
                    
                    if (certDetails.length) {
                        doc.fontSize(9).fillColor('#6b7280').text(certDetails.join(' | '), 50, yPosition);
                        yPosition += index < resumeData.certifications.length - 1 ? 20 : 15;
                    }
                });
            }

            doc.end();
        } catch (error) {
            reject(error);
        }
    });
};