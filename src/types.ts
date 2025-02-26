export interface JobType {
    id: String
    title: String
    type: String
    location: String
    description: String
    salary: String
    company: {
        name: String
        description: String
        contactEmail: String
        contactPhone: String
    }
}