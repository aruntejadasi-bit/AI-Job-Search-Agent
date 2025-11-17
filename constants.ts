
import type { Job } from './types';

export const JOBS_DATA: Job[] = [
  {
    id: 1,
    title: 'Senior Frontend Engineer',
    company: 'InnovateTech',
    location: 'San Francisco, CA (Remote)',
    salary: '$150,000 - $180,000',
    skills: ['React', 'TypeScript', 'Next.js', 'GraphQL', 'Tailwind CSS', 'CI/CD'],
    experience: '5+ years',
    description: 'Join our team to build next-generation web applications. You will be responsible for developing and maintaining our core platform, working with a modern tech stack including React, TypeScript, and Next.js. Strong experience with performance optimization and building scalable UIs is required.'
  },
  {
    id: 2,
    title: 'Backend Developer (Java)',
    company: 'DataSolutions Inc.',
    location: 'New York, NY',
    salary: '$130,000 - $160,000',
    skills: ['Java', 'Spring Boot', 'Kafka', 'PostgreSQL', 'Microservices', 'AWS'],
    experience: '4+ years',
    description: 'We are looking for a skilled Java Backend Developer to design, develop, and maintain our microservices architecture. You will work with Spring Boot, Kafka for messaging, and PostgreSQL databases, all deployed on AWS. Experience with distributed systems is a plus.'
  },
  {
    id: 3,
    title: 'Full-Stack Engineer',
    company: 'Creative Minds',
    location: 'Austin, TX',
    skills: ['Node.js', 'React', 'TypeScript', 'MongoDB', 'Express.js', 'Docker'],
    experience: '3+ years',
    description: 'Creative Minds is seeking a versatile Full-Stack Engineer to work on both our client-facing applications and backend services. The ideal candidate is proficient in the MERN stack (MongoDB, Express, React, Node.js) and has experience with containerization using Docker.'
  },
  {
    id: 4,
    title: 'Data Scientist',
    company: 'QuantumLeap AI',
    location: 'Boston, MA (Hybrid)',
    salary: '$140,000 - $190,000',
    skills: ['Python', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'SQL', 'BigQuery'],
    experience: '5+ years',
    description: 'As a Data Scientist at QuantumLeap AI, you will develop machine learning models to solve complex business problems. You should have a strong background in statistical analysis and experience with deep learning frameworks like TensorFlow or PyTorch. PhD in a related field is preferred.'
  }
];
