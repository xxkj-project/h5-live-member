/*
 * @Author: wangshengxian
 * @Date: 2020-12-21 11:38:50
 * @LastEditors: wangshengxian
 * @LastEditTime: 2020-12-21 11:39:49
 * @Desc: 唐僧直播说明文件路由 - router
 */

const explainTsliveRouter = [
  {
    path: '/privacy_policy_review',
    name: 'PrivacyPolicyReview',
    component: () => import(/* webpackChunkName: 'privacy_policy' */ '@/views/explainTslive/privacy_policy'),
    meta: {
      title: '隐私政策'
    }
  },
  {
    path: '/platform_introduce_review',
    name: 'PlatformIntroduceReview',
    component: () => import(/* webpackChunkName: 'platform_introduce' */ '@/views/explainTslive/platform_introduce'),
    meta: {
      title: '平台介绍'
    }
  },
  {
    path: '/operation_rules_review',
    name: 'OperationRulesReview',
    component: () => import(/* webpackChunkName: 'operation_rules' */ '@/views/explainTslive/operation_rules'),
    meta: {
      title: '运营规则'
    }
  },
  {
    path: '/community_convention_review',
    name: 'CommunityConventionReview',
    component: () =>
      import(/* webpackChunkName: 'community_convention' */ '@/views/explainTslive/community_convention'),
    meta: {
      title: '平台公约'
    }
  },
  {
    path: '/user_agreement_review',
    name: 'UserAgreementReview',
    component: () => import(/* webpackChunkName: 'user_agreement' */ '@/views/explainTslive/user_agreement'),
    meta: {
      title: '用户协议'
    }
  }
]

const explainFileRouter = [
  {
    path: '/privacy_policy',
    name: 'PrivacyPolicy',
    component: () => import(/* webpackChunkName: 'privacy_policy' */ '@/views/explain/privacy_policy'),
    meta: {
      title: '隐私政策'
    }
  },
  {
    path: '/platform_introduce',
    name: 'PlatformIntroduce',
    component: () => import(/* webpackChunkName: 'platform_introduce' */ '@/views/explain/platform_introduce'),
    meta: {
      title: '平台介绍'
    }
  },
  {
    path: '/operation_rules',
    name: 'OperationRules',
    component: () => import(/* webpackChunkName: 'operation_rules' */ '@/views/explain/operation_rules'),
    meta: {
      title: '运营规则'
    }
  },
  {
    path: '/community_convention',
    name: 'CommunityConvention',
    component: () => import(/* webpackChunkName: 'community_convention' */ '@/views/explain/community_convention'),
    meta: {
      title: '平台公约'
    }
  },
  {
    path: '/user_agreement',
    name: 'UserAgreement',
    component: () => import(/* webpackChunkName: 'user_agreement' */ '@/views/explain/user_agreement'),
    meta: {
      title: '用户协议'
    }
  },
  ...explainTsliveRouter
]

export default explainFileRouter
