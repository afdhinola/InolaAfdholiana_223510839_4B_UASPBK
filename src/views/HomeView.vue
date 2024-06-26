<template>
    <div id="home">
        <TodoListView />
        <router-view></router-view>
    </div>
</template>

<script>
    import TodoListView from './TodoListView.vue';

    export default {
        name: 'HomeView',
        components: {
            TodoListView
        }
    };
    
</script>