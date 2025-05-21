const { NodeSDK } = require("@opentelemetry/sdk-node");
const { diag, DiagConsoleLogger, DiagLogLevel } = require("@opentelemetry/api");
const { getNodeAutoInstrumentations } = require("@opentelemetry/auto-instrumentations-node");
const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-proto');
const { OTLPMetricExporter } = require('@opentelemetry/exporter-metrics-otlp-proto');
const { PeriodicExportingMetricReader } = require("@opentelemetry/sdk-metrics");
const { SemanticResourceAttributes } = require('@opentelemetry/semantic-conventions');

// Configure the OpenTelemetry SDK
diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.INFO);

const sdk = new NodeSDK({
  serviceName: process.env.SERVICE_NAME || 'dice-service',
  traceExporter: new OTLPTraceExporter({
    url: process.env.OTLP_TRACE_EXPORTER,
    headers: {},
  }),
  metricReader: new PeriodicExportingMetricReader({
    exporter: new OTLPMetricExporter({
      url: process.env.OTLP_METRIC_EXPORTER,
      headers: {},
    }),
    exportIntervalMillis: 1000,
  }),
  instrumentations: [getNodeAutoInstrumentations()],
});

sdk.start();