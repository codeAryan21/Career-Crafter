import { Job } from '../models/job.model.js';

export const getJobRecommendations = async (userId, userSkills, preferences) => {
    try {
        // Build query based on user preferences and skills
        let query = { visible: true };
        
        if (preferences?.jobCategories?.length) {
            query.category = { $in: preferences.jobCategories };
        }
        
        if (preferences?.locations?.length) {
            query.location = { $in: preferences.locations };
        }
        
        if (preferences?.salaryRange) {
            query.salary = {
                $gte: preferences.salaryRange.min || 0,
                $lte: preferences.salaryRange.max || 999999
            };
        }

        let jobs = await Job.find(query)
            .populate('companyId', 'name image')
            .sort({ createdAt: -1 })
            .limit(20);

        // Score jobs based on skill matching
        if (userSkills?.length) {
            jobs = jobs.map(job => {
                const jobText = `${job.title} ${job.description}`.toLowerCase();
                const matchingSkills = userSkills.filter(skill => 
                    jobText.includes(skill.toLowerCase())
                );
                
                return {
                    ...job.toObject(),
                    matchScore: matchingSkills.length,
                    matchingSkills
                };
            });
            
            // Filter out jobs with no skill matches
            jobs = jobs.filter(job => job.matchScore > 0);
            
            // Sort by match score
            jobs.sort((a, b) => b.matchScore - a.matchScore);
        }

        return jobs.slice(0, 10); // Return top 10 recommendations
    } catch (error) {
        console.error('Error getting job recommendations:', error);
        throw new Error('Failed to get job recommendations');
    }
};