<template >
  <div class="clubview">
    <h1>{{ }}</h1>
    <h2> </h2>
    <div class="talentdashboard">
      <h2>{{ andList }}</h2>
      <ul>
        <li v-for="andi in andis"
          class="member"
          :key="andi.id">
          <div class="view">
            <label class="member-name">{{ andi.name }}</label>
            <label>{{ andi.email }}</label>
            <ul>
              <li v-for="skill in andi.skills">
                <div class="skillItem">
                  <label>{{ skill.name }}</label>
                  <label>{{ skill.level }}</label>
                  <label>{{ skill.interest }}</label>
                </div>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'clubview',
  data () {
    return {
      andList: 'List of club ANDis',
      andis: []
    }
  },
  methods: {
    getAndis () {
      axios.get(this.urlGet)
        .then(response => { this.andis = response.data })
    }
  },
  computed: {
    urlGet () {
      return this.getAndisUrl
    }
  },
  mounted () {
    this.getAndis()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #35495E;
}
</style>
