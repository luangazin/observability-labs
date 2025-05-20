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

- OpenTelemetry Collector:
  - OTLP gRPC: `localhost:4317`

- Jaeger:
  - Collector HTTP: `localhost:14268`
  - Agent UDP: `localhost:6831`

## Stopping the Stack

To stop all services:
```bash
docker compose down
```

## Docs
* [OpenTelemetry Documentation](https://opentelemetry.io/docs/)
* [Jaeger Documentation](https://www.jaegertracing.io/docs/)
* [Prometheus Documentation](https://prometheus.io/docs/introduction/overview/)
* [Grafana Documentation](https://grafana.com/docs/)

## Credits
* [Medium Article](https://medium.com/@blackhorseya/deploying-opentelemetry-collector-jaeger-and-prometheus-with-docker-compose-for-observability-fedd7c0898b5)
