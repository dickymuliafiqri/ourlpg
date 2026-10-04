<template>
  <UApp>
    <div class="min-h-screen bg-gray-50 dark:bg-neutral-900 py-6 sm:py-10">
      <UContainer class="max-w-5xl">
        <!-- Header Section -->
        <div class="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div class="flex items-center gap-3 mb-2">
              <div class="p-2 bg-primary-100 dark:bg-primary-900/50 rounded-lg">
                <UIcon name="i-heroicons-circle-stack" class="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </div>
              <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                OurLPG Monitor
              </h1>
            </div>
            <p class="text-sm sm:text-base text-gray-500 dark:text-gray-400">
              Real-time monitoring system for MyLPG stock and priorities.
            </p>
          </div>
          <UButton 
            icon="i-heroicons-arrow-path" 
            color="gray" 
            variant="solid" 
            @click="refresh" 
            :loading="pending"
            class="shadow-sm"
          >
            Refresh Data
          </UButton>
        </div>

        <!-- Main Content -->
        <UCard :ui="{ body: { padding: 'p-0 sm:p-0' } }" class="shadow-md overflow-hidden">
          <UTable 
            sticky 
            :data="formattedUsers" 
            :columns="columns" 
            :meta="meta" 
            class="w-full max-h-[600px] sm:max-h-[70vh]"
            :loading="pending"
          />
        </UCard>

        <!-- Footer -->
        <div class="mt-8 text-center pb-4">
          <p class="text-xs sm:text-sm text-gray-400 dark:text-gray-500">
            &copy; {{ new Date().getFullYear() }} Para Pengabdi Coding. All rights reserved.
          </p>
        </div>
      </UContainer>
    </div>
  </UApp>
</template>

<script setup lang="ts">
import { h, resolveComponent, computed } from "vue";
import type { TableMeta, Row } from "@tanstack/vue-table";
import type { TableColumn } from "@nuxt/ui";
import { formatTimeAgo } from "./utils/helper";

const USwitch = resolveComponent("USwitch");
const UIcon = resolveComponent("UIcon");

type DataType = {
  id: number;
  name: string;
  stock: number;
  isPriority: boolean;
  lastUpdated: string;
};

const columns: TableColumn<DataType>[] = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "name", header: "Name" },
  { accessorKey: "stock", header: "Stock" },
  {
    accessorKey: "isPriority",
    header: "Priority",
    cell: ({ row }) => {
      return h(USwitch, {
        modelValue: row.original.isPriority,
        disabled: true,
      });
    },
  },
  { accessorKey: "lastUpdated", header: "Last Updated" },
];

const meta: TableMeta<DataType> = {
  class: {
    tr: (row: Row<DataType>) => {
      const lastUpdatedStr = row.original.lastUpdated;
      const lastUpdatedSlice = lastUpdatedStr.split(" ");
      if (parseInt(lastUpdatedSlice[0]!) > 5 && ["jam", "hari"].includes(lastUpdatedSlice[1]!)) {
        return "bg-red-50 dark:bg-red-950/30";
      }
      if (row.original.stock >= 100) {
        return "bg-red-50 dark:bg-red-950/30";
      }
      if (row.original.stock >= 50) {
        return "bg-orange-50 dark:bg-orange-950/30";
      }
      if (row.original.stock > 0) {
        return "bg-blue-50 dark:bg-blue-950/30";
      }
      return "";
    },
  },
};

const { data: users, pending, refresh } = useFetch('/api/users');

const formattedUsers = computed(() => {
  if (!users.value) return [];
  return users.value.map((data: any) => {
    // Handling the date conversion based on the original logic
    // data.lastUpdated is an ISO string created from a Date object where the timestamp was in seconds
    const dateFromDb = new Date(data.lastUpdated);
    const correctDate = new Date(dateFromDb.getTime() * 1000);

    return {
      ...data,
      lastUpdated: formatTimeAgo(correctDate),
    } as DataType;
  });
});
</script>
