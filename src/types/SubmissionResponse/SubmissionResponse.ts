export interface SubmissionResponse {
  id: string;
  score: number;
  values: any[];
  sparse_values: {
    indices: any[];
    values: any[];
  };
  metadata: {
    dense: string;
    description_from_publisher: string;
    homepage_link: string;
    id: string;
    language: string;
    openaccess: string;
    servicecode: string;
    submissionlink: string;
    title: string;
  };
}
