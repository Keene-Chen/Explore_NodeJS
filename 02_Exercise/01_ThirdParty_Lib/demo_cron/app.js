const dayjs = require('dayjs');

var CronJob = require('cron').CronJob;
var job = new CronJob(
  '*/2 * * * * *',
  () => {
    console.log(job.nextDate());
    console.log(
      'You will see this message every second ' +
        dayjs().format('YYYY-MM-DD HH:mm:ss')
    );
  },
  null,
  true,
  'Asia/Shanghai'
);
job.start();
