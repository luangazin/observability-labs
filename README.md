# Observability Labs

This project sets up a complete observability stack using OpenTelemetry, Jaeger, Prometheus, and Grafana.

## Getting Started

### Prerequisites

- Docker
- Docker Compose

### Running the Stack

1. Start all services:
```bash
docker compose up -d
```

2. Verify all services are running:
```bash
docker compose ps
```

## Accessing Services

The following services are available in your browser:

- **Grafana**: [http://localhost:3000](http://localhost:3000)
  - Username: `admin`
  - Password: `admin`

- **Jaeger UI**: [http://localhost:16686](http://localhost:16686)
  - Used for distributed tracing visualization

- **Prometheus**: [http://localhost:9090](http://localhost:9090)
  - Used for metrics querying and visualization

## Service Endpoints

### OpenTelemetry Collector
- OTLP gRPC: `localhost:4317`
- OTLP HTTP: `localhost:4318`
- Metrics: `localhost:8888`
- Prometheus Exposition: `localhost:8889`
- Health Check: `localhost:13133`

### Jaeger
- Web UI: `localhost:16686`
- gRPC Model: `localhost:14250`
- HTTP Thrift: `localhost:14268`
- Health Check: `localhost:14269`
- Thrift Compact (UDP): `localhost:6831`
- Thrift Binary (UDP): `localhost:6832`
- Configurations: `localhost:5778`

### Prometheus
- Web UI & API: `localhost:9090`

### Grafana 
- Web UI: `localhost:3000`

## Data Persistence
The stack includes persistent volumes for:
- Prometheus data
- Grafana data

## Stopping the Stack

To stop all services and retain data:
```bash
docker compose down
```

To stop all services and remove persistent volumes:
```bash
docker compose down -v
```

## Documentation
* [OpenTelemetry Documentation](https://opentelemetry.io/docs/)
* [Jaeger Documentation](https://www.jaegertracing.io/docs/)
* [Prometheus Documentation](https://prometheus.io/docs/introduction/overview/)
* [Grafana Documentation](https://grafana.com/docs/)