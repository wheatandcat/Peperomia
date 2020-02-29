import { schedule, message } from 'danger';
import { istanbulCoverage } from 'danger-plugin-istanbul-coverage';

message('hello danger');

const successCoveRage = 80;

schedule(
  istanbulCoverage({
    reportFileSet: 'createdOrModified',
    customSuccessMessage: `テストカバレッジ${successCoveRage}%以上を達成しました`,
    customFailureMessage: `テストカバレッジが${successCoveRage}%以下です`,
    coveragePath: { path: './coverage/lcov.info', type: 'lcov' },

    reportMode: 'warn',

    threshold: {
      statements: successCoveRage,
      branches: successCoveRage,
      functions: successCoveRage,
      lines: successCoveRage,
    },
  })
);
