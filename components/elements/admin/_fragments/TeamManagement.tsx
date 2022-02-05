import { useEffect } from 'react';

import { Box, Input, Flex, Button, Text, VStack } from '@chakra-ui/react';
import useGetMyTeam from '../hooks/useGetMyTeam';

import { useForm } from 'react-hook-form';
import { setTeam, TeamProps } from 'features/Admin/adminSlice';
import { useDispatch } from 'react-redux';
import { useRootState } from 'components/hooks/useRootState';

import usePatchTeam from '../hooks/usePatchTeam';

const TeamManagement = () => {
  // const [error, setError] = useState<any>({});
  const dispatch = useDispatch();
  const { team } = useRootState((state) => state.ADMIN);

  const {
    register,
    watch,
    setValue,
    setError,
    clearErrors,
    handleSubmit,
    formState: { errors },
  } = useForm<TeamProps>({ defaultValues: team });

  const patchTeam = usePatchTeam;
  const getMyTeam = useGetMyTeam;

  const onSubmit = (data: TeamProps) => {
    clearErrors();
    patchTeam(data)
      .then((res: any) => {
        dispatch(setTeam(res));
      })
      .catch((err: any) => {
        setError(err.name, err.value);
      });
  };

  useEffect(() => {
    const init = async () => {
      const teamData: any = await getMyTeam();
      dispatch(setTeam(teamData));
    };
    init();
  }, []);

  useEffect(() => {
    if (team) {
      setValue('name', team.name);
      setValue('slug', team.slug);
    }
  }, [team]);

  const formData = watch();

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <Box py="15px">
        <Flex justifyContent="flex-end" mb="20px">
          <Button size="sm" colorScheme="dark" disabled={JSON.stringify(formData) === JSON.stringify(team)} type="submit">
            저장
          </Button>
        </Flex>
        <VStack w="100%" spacing="15px">
          <Box w="100%">
            <Input
              placeholder="팀이름"
              defaultValue={team?.slug}
              isInvalid={!!errors?.name?.message}
              {...register('name', { required: '빈칸을 입력해주세요.' })}
            />
            {!!errors?.name?.message && (
              <Text color="warning" textStyle="sm" textAlign="left" w="100%" mt="5px">
                {errors?.name?.message}
              </Text>
            )}
          </Box>
          <Box w="100%">
            <Input
              placeholder="slug"
              defaultValue={team?.slug}
              isInvalid={!!errors?.slug?.message}
              {...register('slug', { required: '빈칸을 입력해주세요.' })}
            />
            {!!errors?.slug?.message && (
              <Text color="warning" textStyle="sm" textAlign="left" w="100%" mt="5px">
                {errors?.slug?.message}
              </Text>
            )}
          </Box>
        </VStack>
      </Box>
    </form>
  );
};

export default TeamManagement;
