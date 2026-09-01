import { Client } from "@elastic/elasticsearch";
import dotenv from "dotenv";
import { orderMapping } from "./orderMapping";

dotenv.config();

const ELASTICSEARCH_NODE = process.env.ELASTICSEARCH_NODE || "http://localhost:9200";
const ELASTICSEARCH_INDEX = process.env.ELASTICSEARCH_INDEX || "orders";

export const elasticsearchClient = new Client({
  node: ELASTICSEARCH_NODE,
});

export const initializeElasticsearch = async () => {
  try {
    // Check if Elasticsearch is reachable
    const health = await elasticsearchClient.cluster.health();
    console.log("Elasticsearch cluster health:", health.status);

    // Check if index exists
    const indexExists = await elasticsearchClient.indices.exists({
      index: ELASTICSEARCH_INDEX,
    });

    if (!indexExists) {
      // Create index with mapping
      await elasticsearchClient.indices.create({
        index: ELASTICSEARCH_INDEX,
        body: {
          mappings: orderMapping,
        },
      });
      console.log(`Index '${ELASTICSEARCH_INDEX}' created successfully`);
    } else {
      console.log(`Index '${ELASTICSEARCH_INDEX}' already exists`);
    }
  } catch (error) {
    console.error("Error initializing Elasticsearch:", error);
    throw error;
  }
};

export const getIndexName = () => ELASTICSEARCH_INDEX;
