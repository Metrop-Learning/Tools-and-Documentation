import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'
const supabase = createClient('https://jzpamrnoigzrsrzweesi.supabase.co', 'sb_publishable_iGQxLRwCBtqjls75aH99Dw_8_dp28fe')

const { data, error } = await supabase.rpc('get_trafic_data');

if (error) {
  console.error(error);
}

console.log(data)

const labels = data.map(row => row.day);

const connections = data.map(row => row.num_connection);

const firstConnections = data.map(
  row => row.num_first
);

new Chart(document.getElementById('chart'), {
  type: 'line',
  data: {
    labels,
    datasets: [
      {
        label: 'Unique daily connection',
        data: connections,
        borderColor: '#36A2EB',
        backgroundColor: '#36A2EB',
        tension: 0.3
      },
      {
        label: 'First connection (new user or device)',
        data: firstConnections,
        borderColor: '#FF6384',
        backgroundColor: '#FF6384',
        tension: 0.3
      }
    ]
  },
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});