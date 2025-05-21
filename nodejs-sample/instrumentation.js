const { NodeSDK } = require("@opentelemetry/sdk-node");
const { ConsoleSpanExporter } = require("@opentelemetry/sdk-trace-node");
const { diag, DiagConsoleLogger, DiagLogLevel } = require("@opentelemetry/api");
const {
  getNodeAutoInstrumentations,
} = require("@opentelemetry/auto-instrumentations-node");
const {
  PeriodicExportingMetricReader,
  ConsoleMetricExporter,
} = require("@opentelemetry/sdk-metrics");

diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.INFO);

const sdk = new NodeSDK({
  traceExporter: new ConsoleSpanExporter(),
  metricReader: new PeriodicExportingMetricReader({
    exporter: new ConsoleMetricExporter(),
  }),
  instrumentations: [getNodeAutoInstrumentations()],
});

sdk.start();
