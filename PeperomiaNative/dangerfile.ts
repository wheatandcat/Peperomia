import { schedule, message } from 'danger';
import { istanbulCoverage } from 'danger-plugin-istanbul-coverage';

message('hello danger');

schedule(
  istanbulCoverage({
    reportFileSet: 'createdOrModified',

    coveragePath: { path: './coverage/lcov.info', type: 'lcov' },

    reportMode: 'warn',

    threshold: {
      statements: 80,
      branches: 80,
      functions: 80,
      lines: 80,
    },
  })
);
