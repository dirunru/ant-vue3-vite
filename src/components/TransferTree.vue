<!-- 角色权限分配弹窗 -->
<template>
  <!--  :confirm-loading="loading" -->
  <a-modal :width="1000" title="选择组织" :open="visible" :maskClosable="false" style="top: 20px" @update:visible="updateVisible" @ok="save">
    <a-spin :spinning="authLoading">
      <a-card class="select-box" :bordered="true" style="height: 450px">
        <a-transfer class="tree-transfer" :data-source="dataSource" :target-keys="targetKeys" :render="(item) => item.title" :show-select-all="false" @change="onChange" :titles="['组织', '已选组织']">
          <template #children="{ direction, selectedKeys, onItemSelect }">
            <template v-if="direction === 'left'">
              <a-tree
                v-if="leftTreeData.length"
                blockNode
                checkable
                defaultExpandAll
                :tree-data="leftTreeData"
                :checked-keys="leftCheckedKey"
                @check="
                  (_, props) => {
                    handleLeftChecked(_, props, [...selectedKeys, ...targetKeys], onItemSelect);
                  }
                "
              />
              <a-empty v-else>
                <template #description>暂无数据</template>
              </a-empty>
            </template>
            <template v-else-if="direction === 'right'">
              <a-tree
                v-if="rightTreeData.length"
                blockNode
                checkable
                defaultExpandAll
                :tree-data="rightTreeData"
                v-model:checked-keys="rightCheckedKey"
                v-model:expanded-keys="rightExpandedKey"
                @check="
                  (_, props) => {
                    handleRightChecked(_, props, [...selectedKeys, ...targetKeys], onItemSelect);
                  }
                "
              />
              <a-empty v-else>
                <template #description>暂无数据</template>
              </a-empty>
            </template>
          </template>
        </a-transfer>
      </a-card>
    </a-spin>
  </a-modal>
</template>

<script setup>
  import { ref, watch, computed, defineProps } from 'vue';
  import { cloneDeep, flatten, getDeepList, getTreeKeys, handleLeftTreeData, handleRightTreeData, isChecked, uniqueTree } from '@/utils';
  import { message } from 'ant-design-vue/es';
  // import { getAuthTree } from '@/api/integral/setting';
  const emit = defineEmits(['update:visible']);
  const props = defineProps({
    // 弹窗是否打开
    visible: Boolean,
    editKey: { type: Array, default: () => [] }
  });

  /* 更新visible */
  const updateVisible = (value) => {
    emit('update:visible', value);
  };
  const authLoading = ref(false);
  watch(
    () => props.visible,
    (visible) => {
      if (visible) {
      } else {
      }
    }
  );

  // const treeData = ref([]);
  // const getTreeData = () => {
  //   treeData.value = [];
  //   getAuthTree()
  //     .then((data) => {
  //       treeData.value = data;
  //       processTreeData(data);
  //     })
  //     .catch((e) => {
  //       message.error(e.message);
  //     });
  // };
  // getTreeData();
  const treeData = ref([
    {
      key: '0',
      title: '0',
      children: [
        {
          key: '0-0',
          title: '0-0',
          parentKey: '0'
        },
        {
          key: '0-1',
          title: '0-1',
          parentKey: '0',
          children: [
            {
              key: '0-1-0',
              title: '0-1-0',
              parentKey: '0-1'
            },
            {
              key: '0-1-1',
              title: '0-1-1',
              parentKey: '0-1'
            }
          ]
        },
        {
          key: '0-2',
          title: '0-3',
          parentKey: '0'
        }
      ]
    }
  ]);

  const targetKeys = ref([]); // 显示在右侧框数据的 key 集合
  const dataSource = ref([]); // 数据源，其中的数据将会被渲染到左边一栏
  const leftCheckedKey = ref([]); // 左侧树选中 key 集合
  const leftHalfCheckedKeys = ref([]); // 左侧半选集合
  const leftCheckedAllKey = ref([]); // 左侧树选中的 key 集合，包括半选与全选
  const leftTreeData = ref([]); // 左侧树
  const rightCheckedKey = ref([]); // 右侧树选中集合
  const rightCheckedAllKey = ref([]); // 右侧树选中集合，包括半选与全选
  const rightExpandedKey = ref([]); // 右侧展开数集合
  const rightTreeData = ref([]); // 右侧树
  const emitKeys = ref([]); // 往父级组件传递的数据
  const deepList = ref([]); // 深层列表

  // 处理树数据
  const processTreeData = () => {
    dataSource.value = [];
    flatten(cloneDeep(treeData.value), dataSource.value);
    console.log(dataSource.value);
    if (props.editKey.length) {
      processEditData();
    } else {
      leftTreeData.value = handleLeftTreeData(cloneDeep(treeData.value), leftCheckedKey.value);
    }
  };
  processTreeData(treeData);
  // 处理编辑数据
  const processEditData = () => {
    leftCheckedAllKey.value = props.editKey;
    rightExpandedKey.value = props.editKey;
    targetKeys.value = props.editKey;
    rightTreeData.value = handleRightTreeData(cloneDeep(treeData.value), props.editKey);

    getDeepList(deepList.value, treeData.value);

    leftCheckedKey.value = uniqueTree(props.editKey, deepList.value);
    leftHalfCheckedKeys.value = leftCheckedAllKey.value.filter((item) => leftCheckedKey.value.indexOf(item) === -1);
    leftTreeData.value = handleLeftTreeData(cloneDeep(treeData.value), leftCheckedKey.value);

    emitKeys.value = rightExpandedKey.value;
  };
  // 穿梭更改
  const onChange = (targetKeys, direction) => {
    console.log(targetKeys, direction);
    if (direction === 'right') {
      targetKeys.value = leftCheckedAllKey.value;
      rightCheckedKey.value = [];
      console.log('handleRightTreeData(cloneDeep(treeData.value)', handleRightTreeData(cloneDeep(treeData.value), leftCheckedAllKey.value, 'right'));
      rightTreeData.value = handleRightTreeData(cloneDeep(treeData.value), leftCheckedAllKey.value, 'right');
      console.log(leftTreeData.value, '左边1');
      console.log(leftCheckedAllKey.value, '左边');
      leftTreeData.value = handleLeftTreeData(cloneDeep(treeData.value), leftCheckedKey.value, 'right');
      console.log(leftTreeData.value, '左边2');
    } else if (direction === 'left') {
      rightTreeData.value = handleRightTreeData(rightTreeData.value, rightCheckedKey.value, 'left');
      leftTreeData.value = handleLeftTreeData(leftTreeData.value, rightCheckedKey.value, 'left');
      leftCheckedKey.value = leftCheckedKey.value.filter((item) => rightCheckedKey.value.indexOf(item) === -1);
      targetKeys.value = targetKeys.value.filter((item) => rightCheckedKey.value.indexOf(item) === -1);
      leftHalfCheckedKeys.value = leftHalfCheckedKeys.value.filter((item) => rightCheckedKey.value.indexOf(item) === -1);
      rightCheckedKey.value = [];
    }
    rightExpandedKey.value = getTreeKeys(rightTreeData.value);
    emitKeys.value = rightExpandedKey.value;
  };
  // 左侧选择
  // 左侧选择
  const handleLeftChecked = (_, { node, halfCheckedKeys }, checkedKeys, onItemSelect) => {
    console.log(_, { node, halfCheckedKeys }, checkedKeys, onItemSelect, 'c');
    leftCheckedKey.value = _;
    leftHalfCheckedKeys.value = [...new Set([...leftHalfCheckedKeys.value, ...halfCheckedKeys])];
    leftCheckedAllKey.value = [...new Set([...leftHalfCheckedKeys.value, ...halfCheckedKeys, ..._])];
    const { eventKey } = node;
    onItemSelect(eventKey, !isChecked(checkedKeys, eventKey));
  };
  // 右侧选择
  const handleRightChecked = (_, { node, halfCheckedKeys }, checkedKeys, onItemSelect) => {
    rightCheckedKey.value = _;
    rightCheckedAllKey.value = [...halfCheckedKeys, ..._];
    const { eventKey } = node;
    onItemSelect(eventKey, isChecked(_, eventKey));
  };
  // 保存
  const save = () => {
    console.log('rightTreeData.value', rightTreeData.value);
  };
</script>
<style lang="less" scoped>
  .select-box {
    border: none !important;
    :deep(.ant-card-body) {
      padding: 0;
    }
    :deep(.ant-transfer-list-body) {
      height: 410px;
      overflow-y: auto;
    }
  }
</style>
