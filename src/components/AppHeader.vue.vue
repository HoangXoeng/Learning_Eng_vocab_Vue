<template>
    <div class="header">
        <div class="header-session col-12">
            <div class="header__menu">
                <ul class="header__menu-list">
                    <li class="header__menu__item roboto-regular" id="menu--home">
                        <RouterLink id="nav" to="/">Home</RouterLink>
                    </li>
                    <li class="header__menu__item roboto-regular" id="menu--about">
                        <RouterLink id="nav" to="/about">About</RouterLink>
                    </li>
                    <li class="header__menu__item roboto-regular" id="menu--contact">
                        <RouterLink id="nav" to="/about">Contact</RouterLink>
                    </li>
                    <li class="header__menu__item roboto-regular" id="menu--gallery">
                        <RouterLink id="nav" to="/about">Gallery</RouterLink>
                    </li>
                    <li class="header__menu__item roboto-regular" id="menu--team">
                        <RouterLink id="nav" to="/about">Team</RouterLink>
                    </li>
                </ul>
            </div>
            <div class="header__search">
                <input type="text" id="header__search" class="roboto-light" placeholder="Find vocabulary" />
                <span class="header__search__icon"><i class="fa-solid fa-magnifying-glass"></i></span>
            </div>
        </div>
    </div>
</template>


<!-- <script>
export default {
  name: "Header",
};
</script> -->




<style scoped>
#nav{
    color: #212529;
    text-decoration: none;
    transition: color 0.3s ease;
}
#nav:hover{
    color: red;
}
.header {
    height: 80px;
    background-color: #ebe4e4;
}

.header-session {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 30px;
}

.header__menu-list {
    display: flex;
    gap: 40px;
    margin-top: 27px;
    height: 19px;
}

.header__search {
    position: relative;
}

#header__search {
    margin-top: 28px;
    width: 382px;
    border-radius: 10px;
    background-color: white;
    outline: none;
    border: 1px solid #d6d8de;
    height: 28px;
    font-size: 16px;
    padding: 0 16px;
}

.header__search__icon {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(35%);
}
.header__menu__item:hover{
    cursor: pointer;
    color: red;
}
</style>