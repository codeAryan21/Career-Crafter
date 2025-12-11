import mongoose,{Schema} from "mongoose";

const jobSchema = Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        level: {
            type: String,
            required: true,
        },
        salary: {
            type: Number,
            required: true,
        },
        visible: {
            type: Boolean,
            default: true
        },
        companyId: {
            type: Schema.Types.ObjectId,
            ref: "Company",
            required: true
        }
    }, { timestamps: true }
)

// Indexes for better query performance
jobSchema.index({ companyId: 1 });
jobSchema.index({ visible: 1 });
jobSchema.index({ category: 1, location: 1 });

export const Job = mongoose.model("Job",jobSchema);