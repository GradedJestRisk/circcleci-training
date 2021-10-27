const axios = require('axios').default;

async function lastWeekPipelines() {
   const pipelineURL = 'https://circleci.com/api/v2/project/github/1024pix/pix/pipeline?branch=dev';
   try {
      const response = await axios.get(pipelineURL);
      const pipelines = response.data.items;

      const lastWeekPipelines = pipelines.filter((pipeline) => {
         return pipeline.updated_at.includes('2021-02-1')
      });

      const pipelinesIds = lastWeekPipelines.map((pipeline) => {
         return pipeline.id
      });

      return pipelinesIds;

   } catch (error) {
      console.error(error);
   }
}

async function failedPipelines(pipelines) {

   let failedWorkflowsIds = [];
   await Promise.all(pipelines.map(async (pipeline) => {
      try {
         const response = await axios.get(`https://circleci.com/api/v2/pipeline/${pipeline}/workflow`);
         const workflows = response.data.items;
         const failedWorkflows = workflows.filter((workflow) => {
            return workflow.status === 'failed';
         });

         if (failedWorkflows.length > 0){
            failedWorkflowsIds.push(failedWorkflows.map((workflow) => {
               return workflow.id;
            }));
         }

      } catch (error) {
         console.error(error);
      }
   }))

   return failedWorkflowsIds;
}
async function getFailedJobs(workflows) {

   let failedJobsNumbers = [];
   await Promise.all(workflows.map(async (workflow) => {
      try {
         const response = await axios.get(`https://circleci.com/api/v2/workflow/${workflow}/job`);
         const workflows = response.data.items;
         const failedWorkflows = workflows.filter((workflow) => {
            return workflow.status === 'failed';
         });

         if (failedWorkflows.length > 0){
            failedJobsNumbers.push(failedWorkflows.map((workflow) => {
               return workflow.job_number;
            }));
         }

      } catch (error) {
         console.error(error);
      }
   }))

   return failedJobsNumbers;
}



(async () => {
      const pipelines = await lastWeekPipelines();
      const failedWorkflows = await failedPipelines(pipelines);
      console.log(failedWorkflows.length, ' workflow have failed :', failedWorkflows);
      const thefailedJobs = await getFailedJobs(failedWorkflows);
      console.log(thefailedJobs.length, ' jobs have failed :', thefailedJobs);
   }
)()
