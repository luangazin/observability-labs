const { NodeSDK } = require("@opentelemetry/sdk-node");
const { diag, DiagConsoleLogger, DiagLogLevel } = require("@opentelemetry/api");
const { getNodeAutoInstrumentations } = require("@opentelemetry/auto-instrumentations-node");
const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-proto');
const { OTLPMetricExporter } = require('@opentelemetry/exporter-metrics-otlp-proto');
const { OTLPLogExporter } = require('@opentelemetry/exporter-logs-otlp-proto');
const { PeriodicExportingMetricReader } = require("@opentelemetry/sdk-metrics");
const { LoggerProvider, BatchLogRecordProcessor } = require('@opentelemetry/sdk-logs');
const { SemanticResourceAttributes } = require('@opentelemetry/semantic-conventions');
const DEFAULT_OTEL_EXPORTER_OTLP_ENDPOINT = 'http://localhost:4318';
// Configure the OpenTelemetry SDK
diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.INFO);

// Create and configure the LoggerProvider
const loggerProvider = new LoggerProvider();
loggerProvider.addLogRecordProcessor(
  new BatchLogRecordProcessor(
    new OTLPLogExporter({
      url: `${process.env.OTEL_EXPORTER_OTLP_ENDPOINT || DEFAULT_OTEL_EXPORTER_OTLP_ENDPOINT}/v1/logs` ,
      headers: {},
    })
  )
);

const sdk = new NodeSDK({
  serviceName: process.env.SERVICE_NAME || 'dice-service',
  traceExporter: new OTLPTraceExporter({
    url: `${process.env.OTEL_EXPORTER_OTLP_ENDPOINT || DEFAULT_OTEL_EXPORTER_OTLP_ENDPOINT}/v1/traces`,
    headers: {},
  }),
  metricReader: new PeriodicExportingMetricReader({
    exporter: new OTLPMetricExporter({
      url: `${process.env.OTEL_EXPORTER_OTLP_ENDPOINT || DEFAULT_OTEL_EXPORTER_OTLP_ENDPOINT}/v1/metrics` ,
      headers: {},
    }),
    exportIntervalMillis: 1000,
  }),
  instrumentations: [getNodeAutoInstrumentations()],
  loggerProvider: loggerProvider,
});

sdk.start();

// Ensure cleanup when the application shuts down
process.on('SIGTERM', () => {
  sdk.shutdown()
    .then(() => console.log('SDK shut down successfully'))
    .catch((error) => console.log('Error shutting down SDK', error))
    .finally(() => process.exit(0));
});