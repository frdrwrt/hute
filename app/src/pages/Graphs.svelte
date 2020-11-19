<script>
  import { LineChart } from "@carbon/charts-svelte";
</script>

<svelte:head>
  <link rel="stylesheet" href="https://unpkg.com/@carbon/charts/styles.min.css" />
</svelte:head>

<LineChart
	data={[
	{
		"group": "Dataset 1",
		"date": "2019-01-01T00:00:00.000Z",
		"value": 10000
	},
	{
		"group": "Dataset 1",
		"date": "2019-01-01T05:00:00.000Z",
		"value": 12000
	},
	{
		"group": "Dataset 1",
		"date": "2019-01-01T10:00:00.000Z",
		"value": 14000
	},
	{
		"group": "Dataset 1",
		"date": "2019-01-02T00:00:00.000Z",
		"value": 25000
	},
	{
		"group": "Dataset 1",
		"date": "2019-01-02T02:00:00.000Z",
		"value": 26000
	},
	{
		"group": "Dataset 1",
		"date": "2019-01-03T00:00:00.000Z",
		"value": 10000
	},
	{
		"group": "Dataset 1",
		"date": "2019-01-03T05:00:00.000Z",
		"value": 10000
	},
	{
		"group": "Dataset 1",
		"date": "2019-01-03T10:00:00.000Z",
		"value": 12000
	},
	{
		"group": "Dataset 1",
		"date": "2019-01-05T00:00:00.000Z",
		"value": 45000
	},
	{
		"group": "Dataset 1",
		"date": "2019-01-07T00:00:00.000Z",
		"value": 49000
	},
	{
		"group": "Dataset 1",
		"date": "2019-01-07T15:00:00.000Z",
		"value": 45000
	},
	{
		"group": "Dataset 1",
		"date": "2019-01-09T00:00:00.000Z",
		"value": 50000
	},
	{
		"group": "Dataset 1",
		"date": "2019-01-09T05:00:00.000Z",
		"value": 52000
	},
	{
		"group": "Dataset 1",
		"date": "2019-01-09T15:00:00.000Z",
		"value": 55000
	},
	{
		"group": "Dataset 1",
		"date": "2019-01-10T00:00:00.000Z",
		"value": 50000
	},
	{
		"group": "Dataset 1",
		"date": "2019-01-12T00:00:00.000Z",
		"value": 65000
	},
	{
		"group": "Dataset 1",
		"date": "2019-01-13T00:00:00.000Z",
		"value": 80000
	},
	{
		"group": "Dataset 1",
		"date": "2019-01-14T10:00:00.000Z",
		"value": 85000
	},
	{
		"group": "Dataset 1",
		"date": "2019-01-15T07:00:00.000Z",
		"value": 90000
	},
	{
		"group": "Dataset 1",
		"date": "2019-01-15T18:00:00.000Z",
		"value": 70000
	},
	{
		"group": "Dataset 2",
		"date": "2019-01-01T00:00:00.000Z",
		"value": 20000
	},
	{
		"group": "Dataset 2",
		"date": "2019-01-01T03:00:00.000Z",
		"value": 22000
	},
	{
		"group": "Dataset 2",
		"date": "2019-01-01T16:00:00.000Z",
		"value": 24000
	},
	{
		"group": "Dataset 2",
		"date": "2019-01-02T00:00:00.000Z",
		"value": 35000
	},
	{
		"group": "Dataset 2",
		"date": "2019-01-02T07:00:00.000Z",
		"value": 36000
	},
	{
		"group": "Dataset 2",
		"date": "2019-01-03T00:00:00.000Z",
		"value": 20000
	},
	{
		"group": "Dataset 2",
		"date": "2019-01-03T06:00:00.000Z",
		"value": 20000
	},
	{
		"group": "Dataset 2",
		"date": "2019-01-03T18:00:00.000Z",
		"value": 22000
	},
	{
		"group": "Dataset 2",
		"date": "2019-01-05T00:00:00.000Z",
		"value": 62000
	},
	{
		"group": "Dataset 2",
		"date": "2019-01-06T00:00:00.000Z",
		"value": 52000
	},
	{
		"group": "Dataset 2",
		"date": "2019-01-07T00:00:00.000Z",
		"value": 52000
	},
	{
		"group": "Dataset 2",
		"date": "2019-01-07T15:00:00.000Z",
		"value": 52000
	},
	{
		"group": "Dataset 2",
		"date": "2019-01-09T00:00:00.000Z",
		"value": 60000
	},
	{
		"group": "Dataset 2",
		"date": "2019-01-09T05:00:00.000Z",
		"value": 62000
	},
	{
		"group": "Dataset 2",
		"date": "2019-01-09T10:00:00.000Z",
		"value": 62000
	},
	{
		"group": "Dataset 2",
		"date": "2019-01-12T00:00:00.000Z",
		"value": 65000
	},
	{
		"group": "Dataset 2",
		"date": "2019-01-14T00:00:00.000Z",
		"value": 40000
	},
	{
		"group": "Dataset 2",
		"date": "2019-01-15T05:00:00.000Z",
		"value": 45000
	},
	{
		"group": "Dataset 2",
		"date": "2019-01-15T10:00:00.000Z",
		"value": 35000
	},
	{
		"group": "Dataset 2",
		"date": "2019-01-15T18:00:00.000Z",
		"value": 30000
	}
]}
	options={{
	"title": "Line (dense time series)",
	"axes": {
		"bottom": {
			"title": "2019 Annual Sales Figures",
			"mapsTo": "date",
			"scaleType": "time"
		},
		"left": {
			"mapsTo": "value",
			"title": "Conversion rate",
			"scaleType": "linear"
		}
	},
	"curve": "curveMonotoneX",
	"height": "400px"
}}
	/>

